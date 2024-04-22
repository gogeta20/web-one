export interface DatosContactoProvincia {
  provincia: string;
  telefono: string;
  email: string;
}

export interface DatosContactoProvincias {
  CORUÑA: DatosContactoProvincia;
  LUGO: DatosContactoProvincia;
  OURENSE: DatosContactoProvincia;
  PONTEVEDRA: DatosContactoProvincia;
}

export interface DatosContacto {
  datosContacto: DatosContactoProvincias;
}

export const datosContactoInicial = {
  datosContacto: {
    CORUÑA: {
      provincia: "",
      telefono: "",
      email: "",
    },
    LUGO: {
      provincia: "",
      telefono: "",
      email: "",
    },
    OURENSE: {
      provincia: "",
      telefono: "",
      email: "",
    },
    PONTEVEDRA: {
      provincia: "",
      telefono: "",
      email: "",
    },
  },
};
