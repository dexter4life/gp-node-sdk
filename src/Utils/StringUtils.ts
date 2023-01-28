export class StringUtils {
  public static leftPad(
    source: string,
    length: number,
    padString: string,
  ): string {
    if (!source) {
      return source;
    }
    const pad = padString.repeat(length);
    return pad.substring(0, pad.length - source.length) + source;
  }

  public static uuid() {
    //// return uuid of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    let uuid = "";
    let ii;
    for (ii = 0; ii < 32; ii += 1) {
      switch (ii) {
        case 8:
        case 20:
          uuid += "-";
          uuid += ((Math.random() * 16) | 0).toString(16);
          break;
        case 12:
          uuid += "-";
          uuid += "4";
          break;
        case 16:
          uuid += "-";
          uuid += ((Math.random() * 4) | 8).toString(16);
          break;
        default:
          uuid += ((Math.random() * 16) | 0).toString(16);
      }
    }
    return uuid;
  }

  public static btoa(t: string) {
    if (Buffer.from) {
      return Buffer.from(t, "ascii").toString("base64");
    }

    return new Buffer(t, "ascii").toString("base64");
  }

  public static atob(t: string) {
    if (Buffer.from) {
      return Buffer.from(t, "base64").toString("ascii");
    }

    return new Buffer(t, "base64").toString("ascii");
  }

  public static normalize(...strArray: string[]) {
    var resultArray = [];
    if (strArray.length === 0) {
      return "";
    }

    if (typeof strArray[0] !== "string") {
      throw new TypeError("Url must be a string. Received " + strArray[0]);
    }

    // If the first part is a plain protocol, we combine it with the next part.
    if (strArray[0].match(/^[^/:]+:\/*$/) && strArray.length > 1) {
      var first = strArray.shift();
      strArray[0] = first + strArray[0];
    }

    // There must be two or three slashes in the file protocol, two slashes in anything else.
    if (strArray[0].match(/^file:\/\/\//)) {
      strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, "$1:///");
    } else {
      strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, "$1://");
    }

    for (var i = 0; i < strArray.length; i++) {
      var component = strArray[i];

      if (typeof component !== "string") {
        throw new TypeError("Url must be a string. Received " + component);
      }

      if (component === "") {
        continue;
      }

      if (i > 0) {
        // Removing the starting slashes for each component but the first.
        component = component.replace(/^[\/]+/, "");
      }
      if (i < strArray.length - 1) {
        // Removing the ending slashes for each component but the last.
        component = component.replace(/[\/]+$/, "");
      } else {
        // For the last component we will combine multiple slashes to a single one.
        component = component.replace(/[\/]+$/, "/");
      }

      resultArray.push(component);
    }

    var str = resultArray.join("/");
    // Each input component is now separated by a single slash except the possible first plain protocol part.

    // remove trailing slash before parameters or hash
    str = str.replace(/\/(\?|&|#[^!])/g, "$1");

    // replace ? in parameters with &
    var parts = str.split("?");
    str = parts.shift() + (parts.length > 0 ? "?" : "") + parts.join("&");

    return str;
  }
}
