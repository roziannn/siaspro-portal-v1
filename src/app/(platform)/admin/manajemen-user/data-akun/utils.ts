export const formatType = (type: string) => {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const roleToNumber = (role: string) => {
  switch (role) {
    case "administrator":
      return 1;
    case "dosen":
      return 2;
    case "dosen_wali":
      return 3;
    case "mahasiswa":
      return 4;
    default:
      return 0;
  }
};

export const numberToRole = (num: number) => {
  switch (num) {
    case 1:
      return "administrator";
    case 2:
      return "dosen";
    case 3:
      return "dosen_wali";
    case 4:
      return "mahasiswa";
    default:
      return "unknown";
  }
};
