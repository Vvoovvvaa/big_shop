import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { stringify } from "querystring";
import { Observable } from "rxjs";
import { User } from "src/entityes/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private jwtservice:JwtService,
        @InjectRepository(User)
        private userRepository:Repository<User>
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest()

        const {header} = request
        const {authorization} = header

        if(!authorization){
            throw new UnauthorizedException("User are not authorization")
        }

        const [token] = (authorization as string).split(" ").reverse()
        
        try{
            this.jwtservice.verify(token,{secret:process.env.JWT_SECRET})
        
          const user = this.jwtservice.decode(token)
          request.user = user
        }catch{
            throw new UnauthorizedException("User are not authorization")
        }
        return true
    }
}