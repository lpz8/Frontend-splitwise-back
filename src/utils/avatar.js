const FEMALE_HINTS = [" a ", " ana", " sof", " maría", "laura", "yeny", "rubi", "maria", "sofia", "ana ", "laura "];

export function avatarFor(name = "") {
  const n = (" " + name.toLowerCase() + " ").normalize("NFD").replace(/\p{Diacritic}/gu, "");
  const isFemale = FEMALE_HINTS.some(h => n.includes(h));
  return isFemale ? "/female.png" : "/male.png";
}