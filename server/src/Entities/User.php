<?php

namespace App\Entities;

use App\Factories\PDOFactory;
use App\Helpers\Regex;
use App\Managers\Exceptions\PostException;
use App\Managers\Exceptions\UserException;
use App\Managers\PostManager;
use App\Managers\UserManager;

class User extends BaseEntity {
    private ?int $id = null;
    private string $username = '';
    private string $email = '';
    private ?string $phone = null;
    private ?string $bio = null;
    private array $roles = [];
    private string $password = '';
    private string $hashed_password = '';
    private string $firstname = '';
    private string $lastname = '';
    private ?string $date_of_birth = null;
    private ?string $avatar_url = null;
    private string $created_at;
    private string $updated_at;
    private array $followers = [];
    private array $followings = [];
    private array $posts = [];
    private array $comments = [];
    private array $likes = [];

    # CONSTRUCTORS
    public function __construct(array $data = [])
    {
        //        $this->roles = [new Role()];
        $this->created_at = date('Y-m-d H:i:s');
        $this->updated_at = date('Y-m-d H:i:s');

        parent::__construct($data);
    }

    /*==================== SETTERS ====================*/
    public function setId($id): self
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @throws UserException
     */
    public function setUsername(string $username): self
    {
        if (Regex::validateUsername($username)) {
            $this->username = $username;
        } else {
            throw new UserException('Invalid username');
        }
        return $this;
    }

    /**
     * @throws UserException
     */
    public function setEmail(string $email): self
    {
        if (Regex::validateEmail($email)) {
            $this->email = $email;
        } else {
            throw new UserException('Invalid email');
        }
        return $this;
    }

    /**
     * @throws UserException
     */
    public function setPhone(?string $phone): self
    {
        if ($phone === null || strlen($phone) === 0) {
            $this->phone = null;
        } elseif (Regex::validatePhone($phone)) {
            $this->phone = $phone;
        } else {
            throw new UserException('Invalid phone');
        }
        return $this;
    }

    public function setBio(?string $bio): self
    {
        $this->bio = $bio;
        return $this;
    }

    /**
     * @throws UserException
     */
    public function setPassword(string $password): self
    {
        if (Regex::validatePassword($password)) {
            $this->password = $password;
        } else {
            throw new UserException('Invalid password');
        }
        return $this;
    }

    public function setHashedPassword(string $hashedPassword): self
    {
        $this->hashed_password = $hashedPassword;
        return $this;
    }

    /**
     * @throws UserException
     */
    public function setFirstname(string $firstname): self
    {
        if (Regex::validateName($firstname)) {
            $this->firstname = $firstname;
        } else {
            throw new UserException('Invalid firstname');
        }
        return $this;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;
        return $this;
    }

    public function setDateOfBirth(?string $date_of_birth): self
    {
        if ($date_of_birth === null || strlen($date_of_birth) === 0) {
            $this->date_of_birth = null;
        } else {
            $this->date_of_birth = $date_of_birth;
        }
        return $this;
    }

    public function setAvatarUrl(?string $avatar_url): self
    {
        $this->avatar_url = $avatar_url;
        return $this;
    }

    public function setCreatedAt(?string $created_at): self
    {
        $this->created_at = $created_at;
        return $this;
    }

    public function setUpdatedAt(string $updated_at): self
    {
        $this->updated_at = $updated_at;
        return $this;
    }

    /*==================== GETTERS ====================*/
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function getBio(): ?string
    {
        return $this->bio;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function getHashedPassword(): string
    {
        return $this->hashed_password;
    }

    public function getFirstname(): string
    {
        return $this->firstname;
    }

    public function getLastname(): string
    {
        return $this->lastname;
    }

    public function getDateOfBirth(): ?string
    {
        return $this->date_of_birth;
    }

    public function getAvatarUrl(): ?string
    {
        return $this->avatar_url;
    }

    public function getCreatedAt(): string
    {
        return $this->created_at;
    }

    public function getUpdatedAt(): string
    {
        return $this->updated_at;
    }

    /*====================*/
    public function passwordMatch(?string $password = null): bool
    {
        if ($password === null) {
            $password = $this->password;
        }
        return password_verify($password, $this->hashed_password);
    }

    public function toArray(): array
    {
        $roles = [];
        foreach ($this->roles as $role) {
            $roles[] = $role->toArray();
        }

        return [
            'id' => $this->id,
            'username' => $this->username,
            'email' => $this->email,
            'phone' => $this->phone,
            'bio' => $this->bio,
            'roles' => $roles,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'date_of_birth' => $this->date_of_birth,
            'avatar_url' => $this->avatar_url,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    /**
     * @return Role[]
     */
    public function getRoles(): array
    {
        if (empty($this->roles)) {
            $manager = new UserManager(new PDOFactory());
            $this->roles = $manager->getUserRoles($this->getId());
        }
        return $this->roles;
    }

    public function userRolesContains(string $role): bool
    {
        foreach ($this->getRoles() as $userRole) {
            if ($userRole->getName() === $role) {
                return true;
            }
        }
        return false;
    }

    /**
     * @return Post[]
     * @throws PostException
     */
    public function getPosts(): array
    {
        if (empty($this->posts)) {
            $manager = new PostManager(new PDOFactory());
            $this->posts = $manager->getPostByAuthorId($this->getId());
        }

        return $this->posts;
    }

    /**
     * @return User[]
     */
    public function getFollowers(): array
    {
        if (empty($this->followers)) {
            $manager = new UserManager(new PDOFactory());
            $this->followers = $manager->getUserFollowers($this->getId());
        }
        return $this->followers;
    }

    /**
     * @return User[]
     */
    public function getFollowings(): array
    {
        if (empty($this->followings)) {
            $manager = new UserManager(new PDOFactory());
            $this->followings = $manager->getUserFollowings($this->getId());
        }
        return $this->followings;
    }
}
