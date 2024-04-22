<?php  declare(strict_types=1);

namespace App\Main\Infrastructure\Repository\Faker;

use App\Main\Domain\Exception\StoreException;
use App\Main\Domain\Model\TblArticulo;
use App\Main\Domain\Model\TblAutor;
use App\Main\Domain\Model\TblCategoria;
use App\Main\Domain\Model\TblEtiqueta;
use App\Main\Domain\Model\TblImagen;
use App\Main\Domain\Model\TblUsuario;
use App\Main\Domain\Repository\Interfaces\Health\FakerInterface;
use App\Shared\Infrastructure\BaseDoctrine;
use Faker\Factory;

class EntityFakerRepository extends BaseDoctrine implements FakerInterface
{
    /**
     * @throws StoreException
     */
    public function createData(string $entity): array
    {
        try {
            $faker = Factory::create();
            for ($i = 1; $i <= 15; $i++) {
                if($entity == 'autor'){
                    $this->populateTblAutor($faker);
                }
                if($entity == 'imagen'){
                    $this->populateTblImagen($faker);
                }
                if($entity == 'articulo'){
                    $this->populateTblArticulo($faker);
                }
                if($entity == 'usuario'){
                    $this->populateTblUsuario($faker);
                }
                if($entity == 'categoria'){
                    $this->populateTblCategoria($faker);
                }
                if($entity == 'etiqueta'){
                    $this->populateTblEtiqueta($faker);
                }
            }
            return ["creado correctamente"];
        } catch (\Exception $exc) {
            throw new StoreException("Error tabla tbl_imagen :" .$exc->getMessage(),$exc->getCode(),$exc);
        }

    }
    function populateTblImagen($faker): void
    {
//        $entityClass = 'App\Main\Domain\Model\\' . $entity;
        $tblImagen = new TblImagen();
        $tblImagen->setUuid($faker->uuid);
        $tblImagen->setUrl($faker->url);
        $tblImagen->setTitulo($faker->sentence(3));
        $tblImagen->setDescripcion($faker->text);
        $tblImagen->setFechaSubida($faker->dateTimeThisYear);
        $this->persist($tblImagen);
    }

    function populateTblAutor($faker): void
    {
        $tblAutor = new TblAutor();
        $tblAutor->setUuid($faker->uuid);
        $tblAutor->setNombre($faker->firstName);
        $tblAutor->setApellido($faker->lastName);
        $tblAutor->setBiografia($faker->text);
        $tblAutor->setEmail($faker->email);
        $tblAutor->setFoto($this->repository(TblImagen::class)->find(1));
        $tblAutor->setTwitter($faker->url);
        $tblAutor->setFacebook($faker->url);
        $tblAutor->setInstagram($faker->url);
        $tblAutor->setLinkedin($faker->url);
        $this->persist($tblAutor);
    }

    function populateTblArticulo($faker): void
    {
        $tblArticulo = new TblArticulo();
        $tblArticulo->setUuid($faker->uuid);
        $tblArticulo->setTitulo($faker->sentence); // Changed from firstName to sentence
        $tblArticulo->setContenido($faker->text);
        $tblArticulo->setAutorId($this->repository(TblAutor::class)->find(2));
        $tblArticulo->setFecha($faker->dateTime);
        $tblArticulo->setImagen($this->repository(TblImagen::class)->find(2));
        $tblArticulo->setActivo(1);
        $this->persist($tblArticulo);
    }

    function populateTblUsuario($faker): void
    {
        $tblArticulo = new TblUsuario();
        $tblArticulo->setUuid($faker->uuid);
        $tblArticulo->setUsuarioLogin($faker->sentence); // Changed from firstName to sentence
        $tblArticulo->setContrasenha($faker->password);
        $tblArticulo->setNombreUsuarioNicename($faker->userName);
        $tblArticulo->setUsuarioEmail($faker->email);
        $tblArticulo->setUsuarioUrl($faker->url);
        $tblArticulo->setUsuarioRegistro($faker->dateTime);
        $tblArticulo->setUsuarioStatus(1);
        $tblArticulo->setDisplayName($faker->name);
        $this->persist($tblArticulo);
    }
    function populateTblCategoria($faker): void
    {
        $tblCategoria = new TblCategoria();
        $tblCategoria->setUuid($faker->uuid);
        $tblCategoria->setNombre($faker->words(3, true)); // Changed from firstName to sentence
        $tblCategoria->setDescripcion($faker->sentence(6, true)); // Changed from firstName to sentence
        $tblCategoria->setCategoriaPadreId(null); // Changed from firstName to sentence
        $this->persist($tblCategoria);
    }

    function populateTblEtiqueta($faker): void
    {
        $tblCategoria = new TblEtiqueta();
        $tblCategoria->setUuid($faker->uuid);
        $tblCategoria->setNombre($faker->words(3, true)); // Changed from firstName to sentence
        $tblCategoria->setDescripcion($faker->sentence(6, true)); // Changed from firstName to sentence
        $this->persist($tblCategoria);
    }
}
