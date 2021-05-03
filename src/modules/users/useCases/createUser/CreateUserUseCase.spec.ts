import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;

describe("Create User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "New User",
      email: "user@email.com.br",
      password: "123456"
    });

    expect(user).toHaveProperty("id");
  });

  it("Should not be able to create a new user if exists email", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "New User",
        email: "user@email.com.br",
        password: "123456"
      });

      await createUserUseCase.execute({
        name: "New User 2",
        email: "user@email.com.br",
        password: "123456"
      });
    }).rejects.toBeInstanceOf(AppError);
  });
})
