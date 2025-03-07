import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    getAll(): Promise<User[]>{
        return this.userRepository.find();
    }

    getById(id: number): Promise<User | null> {
        return this.userRepository.findOneBy({ id });
    }

    getByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOneBy({ email });
    }

    create(user: CreateUserDto): Promise<User>{
        let userEntity = new User();
        userEntity.name = user.name;
        userEntity.email = user.email;
        userEntity.password = user.password;
        return this.userRepository.save(userEntity);
    }

    async update(id: number, user: Partial<User>): Promise<User | null>{
        await this.userRepository.update(id, user);
        return this.userRepository.findOneBy({ id })
    }

    async remove(id: number): Promise<void>{
        await this.userRepository.delete(id);
    }

}
