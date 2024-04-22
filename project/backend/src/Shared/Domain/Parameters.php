<?php

declare(strict_types=1);

namespace App\Shared\Domain;

use App\Shared\Infrastructure\ContainerParamException;

interface Parameters
{
    /**
     * @throws ContainerParamException
     */
    public function get(string $param): mixed;

    public function has(string $param): bool;

    public function all();
}
