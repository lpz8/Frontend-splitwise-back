export function computeDebts(expenses) {
  const map = new Map();
  for (const e of expenses) {
    const share = e.amount / e.participants.length;
    for (const p of e.participants) {
      const pid = p._id || p;
      const payer = e.paidBy._id || e.paidBy;
      if (String(pid) === String(payer)) continue;
      const key = `${pid}->${payer}`;
      map.set(key, (map.get(key) || 0) + share);
    }
  }
  return [...map.entries()].map(([k, amount]) => {
    const [from, to] = k.split("->");
    return { from, to, amount: Math.round(amount * 100) / 100 };
  });
}