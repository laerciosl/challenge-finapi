import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Show Profile User", () => {
  beforeEach( async () => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    showUserProfileUseCase = new ShowUserProfileUseCase(usersRepositoryInMemory)
  });

  it("Should be able show user profile", async () => {
    await createUserUseCase.execute({
      name: "Test Joao",
      email: "user@email.com",
      password: "123456",
    });

    const userAuthenticated = await authenticateUserUseCase.execute({
      email: "user@email.com",
      password: "123456",
    });

    const user = await showUserProfileUseCase.execute(userAuthenticated.user.id!)

    expect(user).toHaveProperty("email");
    expect(user.name).toBe(user.name);
  });
});
