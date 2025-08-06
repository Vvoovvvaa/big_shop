import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './resources/auth/auth.module';
import { ProductsModule } from './resources/products/products.module';
import { UsersModule } from './resources/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entityes/user.entity';
import { Product } from './entityes/product.entity';


@Module({
  imports: [AuthModule,ProductsModule,UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5555,
      username: 'online_shop_db_user',
      password: 'DsmEntIcKlADaDIaMWor',
      database: 'online_shop_db',
      entities: [User,Product],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}