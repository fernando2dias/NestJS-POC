import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users') // Agrupa os endpoints no Swagger
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @ApiOperation({ summary: 'Lista todos os usuários' })
    @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.' })
    @Get()
    getAll(): Promise<User[]>{
        return this.userService.getAll();
    }

    @ApiOperation({ summary: 'Busca um usuário por ID' })
    @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
    @Get(':id')
    getById(@Param('id') id: string): Promise<User | null>{
        return this.userService.getById(+id);
    }
    
    @ApiOperation({ summary: 'Cria um novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto>{
        return this.userService.create(createUserDto);
    }

    @ApiOperation({ summary: 'Atualiza um usuário existente' })
    @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
    @Put(':id')
    update(@Param('id') id: string, @Body() user: Partial<User>): Promise<User | null>{
        return this.userService.update(+id, user);
    }

    @ApiOperation({ summary: 'Deleta um usuário pelo ID' })
    @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso.' })
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.userService.remove(+id);
    }


}
