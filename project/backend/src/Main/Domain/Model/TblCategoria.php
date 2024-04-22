<?php

namespace App\Main\Domain\Model;

class TblCategoria
{
    private ?int $id = null;
    private ?string $uuid = null;
    private ?string $nombre = null;
    private ?string $descripcion = null;
    private ?int $categoria_padre_id = null;


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

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(?string $nombre): void
    {
        $this->nombre = $nombre;
    }

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setDescripcion(?string $descripcion): void
    {
        $this->descripcion = $descripcion;
    }

    public function getCategoriaPadreId(): ?int
    {
        return $this->categoria_padre_id;
    }

    public function setCategoriaPadreId(?int $categoria_padre_id): void
    {
        $this->categoria_padre_id = $categoria_padre_id;
    }


}
