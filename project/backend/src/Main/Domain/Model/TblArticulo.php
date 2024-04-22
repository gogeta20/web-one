<?php

namespace App\Main\Domain\Model;

class TblArticulo
{
    private ?int $id = null;
    private ?string $uuid = null;
    private ?string $titulo = null;
    private ?string $contenido = null;
    private ?TblAutor $autor_id = null;
    private ?\DateTime $fecha = null;
    private ?TblImagen $imagen = null;
    private ?int $activo = null;


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

    public function getTitulo(): ?string
    {
        return $this->titulo;
    }

    public function setTitulo(?string $titulo): void
    {
        $this->titulo = $titulo;
    }

    public function getContenido(): ?string
    {
        return $this->contenido;
    }

    public function setContenido(?string $contenido): void
    {
        $this->contenido = $contenido;
    }

    public function getAutorId(): ?TblAutor
    {
        return $this->autor_id;
    }

    public function setAutorId(?TblAutor $autor_id): void
    {
        $this->autor_id = $autor_id;
    }

    public function getFecha(): ?\DateTime
    {
        return $this->fecha;
    }

    public function setFecha(?\DateTime $fecha): void
    {
        $this->fecha = $fecha;
    }

    public function getImagen(): ?TblImagen
    {
        return $this->imagen;
    }

    public function setImagen(?TblImagen $imagen): void
    {
        $this->imagen = $imagen;
    }

    public function getActivo(): ?int
    {
        return $this->activo;
    }

    public function setActivo(?int $activo): void
    {
        $this->activo = $activo;
    }

}
