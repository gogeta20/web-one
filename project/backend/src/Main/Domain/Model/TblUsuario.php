<?php

namespace App\Main\Domain\Model;

class TblUsuario
{
    private ?int $id = null;
    private ?string $uuid = null;
    private ?string $usuario_login = null;
    private ?string $contrasenha = null;
    private ?string $nombre_usuario_nicename = null;
    private ?string $usuario_email = null;
    private ?string $usuario_url = null;
    private ?\DateTime $usuario_registro = null;
    private ?int $usuario_status = null;
    private ?string $display_name = null;


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


    public function getUsuarioLogin(): ?string
    {
        return $this->usuario_login;
    }

    public function setUsuarioLogin(?string $usuario_login): void
    {
        $this->usuario_login = $usuario_login;
    }

    public function getContrasenha(): ?string
    {
        return $this->contrasenha;
    }

    public function setContrasenha(?string $contrasenha): void
    {
        $this->contrasenha = $contrasenha;
    }

    public function getNombreUsuarioNicename(): ?string
    {
        return $this->nombre_usuario_nicename;
    }

    public function setNombreUsuarioNicename(?string $nombre_usuario_nicename): void
    {
        $this->nombre_usuario_nicename = $nombre_usuario_nicename;
    }

    public function getUsuarioEmail(): ?string
    {
        return $this->usuario_email;
    }

    public function setUsuarioEmail(?string $usuario_email): void
    {
        $this->usuario_email = $usuario_email;
    }

    public function getUsuarioUrl(): ?string
    {
        return $this->usuario_url;
    }

    public function setUsuarioUrl(?string $usuario_url): void
    {
        $this->usuario_url = $usuario_url;
    }

    public function getUsuarioRegistro(): ?\DateTime
    {
        return $this->usuario_registro;
    }

    public function setUsuarioRegistro(?\DateTime $usuario_registro): void
    {
        $this->usuario_registro = $usuario_registro;
    }

    public function getUsuarioStatus(): ?int
    {
        return $this->usuario_status;
    }

    public function setUsuarioStatus(?int $usuario_status): void
    {
        $this->usuario_status = $usuario_status;
    }

    public function getDisplayName(): ?string
    {
        return $this->display_name;
    }

    public function setDisplayName(?string $display_name): void
    {
        $this->display_name = $display_name;
    }

}
