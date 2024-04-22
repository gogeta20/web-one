<?php  declare(strict_types=1);

namespace App\Main\Infrastructure\Repository\Home;

use App\Main\Domain\Exception\StoreException;
use App\Main\Domain\Model\TblImagen;
use App\Main\Domain\Repository\Interfaces\HomeInterface;
use App\Shared\Infrastructure\BaseDoctrine;

class HomeRepository extends BaseDoctrine implements HomeInterface
{
    /**
     * @throws StoreException
     */
    public function search(): array
    {
        try {
            $queryBuilder = $this->repository(TblImagen::class)->createQueryBuilder('img');
            $query = $queryBuilder->select('img')->getQuery();
            return $query->getArrayResult();
        } catch (\Exception $exc) {
            throw new StoreException("Error tabla tbl_imagen :" .$exc->getMessage(),$exc->getCode(),$exc);
        }

    }
}
