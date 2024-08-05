import { Repository, DataSource } from 'typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { hash, genSalt } from 'bcrypt';
import { UserDto } from './dto/auth-credential.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialDto: AuthCredentialDto): Promise<UserDto> {
    const { email, password } = authCredentialDto;
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const user = this.create({ email, password: hashedPassword });

    try {
      await this.save(user);
      const { id, email } = user;
      return { id, email };
    } catch (error) {
      throw new ConflictException('Existing username');
    }
  }
}
