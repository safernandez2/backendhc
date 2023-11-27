import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { v2 as cloudinary } from 'cloudinary';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  
  cloudinary.config({
    cloud_name: 'deet3k5ss',
    api_key: '765242794257365',
    api_secret: 'larunXK1DJG8jhLY_onL_HnX9_c',
  });

  await app.listen(3000);
}
bootstrap();
