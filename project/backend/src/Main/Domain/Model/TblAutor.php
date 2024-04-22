<?php

namespace App\Main\Domain\Model;

class TblAutor
{
    private ?int $id = null;
    private ?string $uuid = null;
    private ?string $nombre = null;
    private ?string $apellido = null;
    private ?string $biografia = null;
    private ?string $email = null;
    private ?TblImagen $foto = null;
    private ?string $twitter = null;
    private ?string $facebook = null;
    private ?string $instagram = null;
    private ?string $linkedin = null;


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

    public function getApellido(): ?string
    {
        return $this->apellido;
    }

    public function setApellido(?string $apellido): void
    {
        $this->apellido = $apellido;
    }

    public function getBiografia(): ?string
    {
        return $this->biografia;
    }

    public function setBiografia(?string $biografia): void
    {
        $this->biografia = $biografia;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): void
    {
        $this->email = $email;
    }

    public function getFoto(): ?TblImagen
    {
        return $this->foto;
    }

    public function setFoto(?TblImagen $imagen): void
    {
        $this->foto = $imagen;
    }

    public function getTwitter(): ?string
    {
        return $this->twitter;
    }

    public function setTwitter(?string $twitter): void
    {
        $this->twitter = $twitter;
    }

    public function getFacebook(): ?string
    {
        return $this->facebook;
    }

    public function setFacebook(?string $facebook): void
    {
        $this->facebook = $facebook;
    }

    public function getInstagram(): ?string
    {
        return $this->instagram;
    }

    public function setInstagram(?string $instagram): void
    {
        $this->instagram = $instagram;
    }

    public function getLinkedin(): ?string
    {
        return $this->linkedin;
    }

    public function setLinkedin(?string $linkedin): void
    {
        $this->linkedin = $linkedin;
    }

}
