<?php

namespace App\Main\Domain\Model;

class TblImagen
{
    private ?int $id = null;
    private ?string $uuid = null;
    private ?string $url = null;
    private ?string $titulo = null;
    private ?string $descripcion = null;
    private ?\DateTime $fecha_subida = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUuid(): ?string
    {
        return $this->uuid;
    }

    public function setUuid(string $uuid): static
    {
        $this->uuid = $uuid;

        return $this;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): static
    {
        $this->url = $url;

        return $this;
    }

    public function getTitulo(): ?string
    {
        return $this->titulo;
    }

    public function setTitulo(?string $titulo): static
    {
        $this->titulo = $titulo;

        return $this;
    }

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setDescripcion(?string $descripcion): static
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    public function getFechaSubida(): ?\DateTime
    {
        return $this->fecha_subida;
    }

    public function setFechaSubida(\DateTime $fecha_subida): static
    {
        $this->fecha_subida = $fecha_subida;

        return $this;
    }
}
