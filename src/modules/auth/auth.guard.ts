import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { jwtConstants } from "./constants";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                  secret: jwtConstants.secret
                }
              );
            request["user"] = payload;
        } catch (error) {
            throw new UnauthorizedException();
        }
        return true;
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const information: string = request.headers?.authorization;
        if (!information) return undefined;
        const [type, token] = information.split(" ");
        return type === "Bearer" ? token : undefined;
    }

}