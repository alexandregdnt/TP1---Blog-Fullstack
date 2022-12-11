<?php

namespace App\Entities;

class Like extends BaseEntity
{
    protected int $id;
    protected User $user;
    protected ?string $created_at;

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return Like
     */
    public function setId(int $id): self
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }

    /**
     * @param User $user
     * @return Like
     */
    public function setUser(User $user): self
    {
        $this->user = $user;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getCreatedAt(): ?string
    {
        return $this->created_at;
    }

    /**
     * @param string|null $created_at
     * @return Like
     */
    public function setCreatedAt(?string $created_at): self
    {
        $this->created_at = $created_at;
        return $this;
    }

    public function toArray(): array
    {
        $user = $this->getUser()->toArray();
        unset($user['password']);
        unset($user['hashed_password']);

        return [
            'id' => $this->getId(),
            'user' => $user,
            'created_at' => $this->getCreatedAt(),
        ];
    }
}
