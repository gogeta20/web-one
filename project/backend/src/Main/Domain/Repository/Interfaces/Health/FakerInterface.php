<?php

namespace App\Main\Domain\Repository\Interfaces\Health;
interface FakerInterface
{
    public function createData(string $entity): array;
}
