export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validateName(name, maxLength = 30) {
  if (typeof name !== 'string') {
    return undefined;
  }

  if (name.length > maxLength) {
    return false;
  }

  const re = /^([A-Z]{3,})[A-Z]*(\s+[A-Z]+)*$/i;
  return re.test(name);
}

export function validateDescription(description, maxLength = 160) {
  if (typeof description !== 'string' || description.length > maxLength) {
    return false;
  }

  return true;
}

export function isEqualString(firstString, secondString) {
  if (typeof firstString !== 'string' || typeof secondString !== 'string') {
    return false;
  }

  const compare = firstString.localeCompare(secondString);

  if (compare !== 0) {
    return false;
  }

  return true;
}
