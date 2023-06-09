const RESPONSES = Object.freeze({
  SUCCESS: "SUCCESS",
  WRONG: "Credenciales incorrectas",
  ERROR: "Error en la validacion",
  USEREXIST: "El usuario ya existe",
  LENGTHPASSWORD: "La contraseña debe tener minimo 6 caracteres y maximo 20",
  RULESPASSWORD:
    "La contraseña debe tener al menos una letra mayuscula, una minuscula y un numero",
  ERROROPERATION: "No fue posible terminar la operacion",
  EMAILEXIST: "El usuario ya existe por email",
  LENGHTDOCUMENT:"El documento es muy corto",
  TOKENINVALID: "Token invalido"
});

export { RESPONSES };
