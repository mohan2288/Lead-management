import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

Object.defineProperty(window, "CONFIG", {
  value: {
    API_URL: "http://localhost:5000"
  }
});