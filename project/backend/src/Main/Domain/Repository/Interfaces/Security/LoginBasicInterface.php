<?php

namespace App\Main\Domain\Repository\Interfaces\Security;
interface LoginBasicInterface
{
    public function verify(string $entity): array;
}
