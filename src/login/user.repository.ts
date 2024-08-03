import { Repository, DataSource } from 'typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { hash, genSalt } from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      throw new ConflictException('Existing username');

      console.log(error);
    }
  }
}
