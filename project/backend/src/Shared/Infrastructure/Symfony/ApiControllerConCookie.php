<?php

declare(strict_types=1);

namespace App\Shared\Infrastructure\Symfony;

use App\Shared\Domain\Bus\Command\Command;
use App\Shared\Domain\Bus\Command\CommandBus;
use App\Shared\Domain\Bus\Query\Query;
use App\Shared\Domain\Bus\Query\QueryBus;
use App\Shared\Domain\Bus\Query\Response;
use App\Shared\Domain\Parameters;
use Symfony\Contracts\Translation\TranslatorInterface;
use Xorfor\Shared\Infrastructure\Browser\Cookie\CookieBorrar;
use Xorfor\Shared\Infrastructure\Browser\Cookie\CookieCrear;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

use function Lambdish\Phunctional\each;

abstract class ApiControllerConCookie
{

    public function __construct(
        private QueryBus                           $queryBus,
        private CommandBus                         $commandBus,
        private EventDispatcherInterface           $eventDispatcher,
        private ApiExceptionsHttpStatusCodeMapping $exceptionHandler,
        protected Parameters                       $parameters,
        protected CookieCrear                      $cookieCrear,
        protected CookieBorrar                     $cookieBorrar,
        protected TranslatorInterface              $translator
    ) {
        each(
            fn(int $httpCode, string $exceptionClass) => $exceptionHandler->register($exceptionClass, $httpCode),
            $this->exceptions()
        );
    }

    abstract protected function exceptions(): array;

    protected function ask(Query $query): ?Response
    {
        return $this->queryBus->ask($query);
    }

    protected function dispatch(Command $command): void
    {
        $this->commandBus->dispatch($command);
    }
}
