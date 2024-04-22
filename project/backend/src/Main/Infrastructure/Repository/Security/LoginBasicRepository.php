<?php  declare(strict_types=1);

namespace App\Main\Infrastructure\Repository\Security;

use App\Main\Domain\Exception\StoreException;
use App\Main\Domain\Repository\Interfaces\Security\LoginBasicInterface;
use App\Shared\Infrastructure\BaseDoctrine;

class LoginBasicRepository extends BaseDoctrine implements LoginBasicInterface
{
    /**
     * @throws StoreException
     */
    public function verify(string $entity): array
    {
        try {
//            $queryBuilder = $this->repository(TblImagen::class)->createQueryBuilder('img');
//            $query = $queryBuilder->select('img')->getQuery();
//            return $query->getArrayResult();
            return ['in LoginBasic'];
        } catch (\Exception $exc) {
            throw new StoreException("Error tabla tbl_imagen :" .$exc->getMessage(),$exc->getCode(),$exc);
        }

    }
}
