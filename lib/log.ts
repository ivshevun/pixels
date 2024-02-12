
export default function log(...args : any[]) {
  if (!(process.env.NODE_ENV === "development")) return;

  console.log(...args);
}