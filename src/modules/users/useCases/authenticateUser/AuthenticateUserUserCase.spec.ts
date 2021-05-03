import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "New User",
      email: "user@email.com.br",
      password: "123456",
    };

    await createUserUseCase.execute(user);

    const session = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(session).toHaveProperty("token");
  });

  it("Should not be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "teste@email.com",
        password: "12345",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "New User",
        email: "test@email.com.br",
        password: "123456",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "dontremenber",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
