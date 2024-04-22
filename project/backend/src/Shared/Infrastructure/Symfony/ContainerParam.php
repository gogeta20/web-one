<?php

declare(strict_types=1);

namespace App\Shared\Infrastructure\Symfony;

use App\Shared\Domain\Parameters;
use App\Shared\Infrastructure\ContainerParamException;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use function getenv;
use function sprintf;

class ContainerParam implements Parameters
{
    public function __construct(private readonly ContainerBagInterface|ParameterBagInterface $params)
    {
    }

    public function get(string $param): mixed
    {
        try {
            if ($this->params->has($param)) {
                return $this->params->get($param);
            }
            return $this->getParamValueFromEnv($param);
        } catch (ContainerExceptionInterface|NotFoundExceptionInterface|ContainerParamException $exception) {
            throw new ContainerParamException(
                message: sprintf('Parametro %s non atopado. Excepcion: %s', $param, $exception->getMessage()),
                code: $exception->getCode(),
            //previous: $exception
            );
        }
    }

    public function has(string $param): bool
    {
        return $this->params->has($param);
    }

    /**
     * @throws ContainerParamException
     */
    private function getParamValueFromEnv(string $param): string
    {
        $param_value = getenv($param);
        if ($param_value === false) {
            throw new ContainerParamException(sprintf('Non se puido obter o parámetro: %s', $param));
        }
        return $param_value;
    }

    public function all()
    {
        try {
            return $this->params->all();
        } catch (ContainerExceptionInterface|NotFoundExceptionInterface|ContainerParamException $exception) {
            throw new ContainerParamException(
                message: sprintf('Parametro %s non atopado. Excepcion: %s', "", $exception->getMessage()),
                code: $exception->getCode(),
            //previous: $exception
            );
        }
    }

}
