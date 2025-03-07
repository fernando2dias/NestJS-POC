import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity'

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

    create(user: User): Promise<User>{
        return this.userRepository.save(user);
    }

    async update(id: number, user: Partial<User>): Promise<User | null>{
        await this.userRepository.update(id, user);
        return this.userRepository.findOneBy({ id })
    }

    async remove(id: number): Promise<void>{
        await this.userRepository.delete(id);
    }

}
