import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import { UtilUseCases } from "@/core/utilities/UtilUseCases";
import type {
  DatosContacto,
  DatosContactoProvincia,
  DatosContactoProvincias,
} from "@/shared/dominio/arquivosSeccions/DatosContacto";
import Mock from "@/shared/infrastructure/mocks/arquivosSeccions/getDatosContactoMock.json";
import type {
  ResponseData,
  ResponseDatosContacto,
  ResponseDatosContactoProvincia,
  ResponseDatosContactoProvincias,
} from "@/shared/infrastructure/models/arquivosSeccions/ResponseDatosContacto";

async function InMemory(): Promise<ResponseDatosContacto> {
  await UtilHelper.wait(500);
  return Mock.data as ResponseDatosContacto;
}

async function Api(): Promise<ResponseDatosContacto> {
  const response = await http.get<ResponseData>(`datosContacto`);
  const { data } = response.data;
  return data;
}

async function getDatosContacto(): Promise<DatosContacto> {
  const data = UtilHelper.checkEnvironment() ? await InMemory() : await Api();
  return createObject(data);
}

function createObject(item: ResponseDatosContacto): DatosContacto {
  return {
    datosContacto: createObjectDatosContactoProvincias(item.datosContacto),
  };
}

function createObjectDatosContactoProvincias(
  item: ResponseDatosContactoProvincias
): DatosContactoProvincias {
  return {
    CORUÑA: createObjectDatosContactoProvincia(item.CORUÑA),
    LUGO: createObjectDatosContactoProvincia(item.LUGO),
    OURENSE: createObjectDatosContactoProvincia(item.OURENSE),
    PONTEVEDRA: createObjectDatosContactoProvincia(item.PONTEVEDRA),
  };
}

function createObjectDatosContactoProvincia(
  item: ResponseDatosContactoProvincia
): DatosContactoProvincia {
  return {
    provincia: UtilUseCases.verifyValueString(item.provincia),
    telefono: UtilUseCases.verifyValueString(item.telefono),
    email: UtilUseCases.verifyValueString(item.email),
  };
}

export { getDatosContacto };
