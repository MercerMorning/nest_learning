import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { EventEntity } from '../events/entities/event.entity/event.entity';

// class MockCoffeeService {}
@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, EventEntity])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    // {
    //   provide: CoffeesService,
    //   useValue: new MockCoffeeService(),
    // },
    {
      provide: 'COFFEE_BRANDS',
      useValue: ['buddy', 'nes'],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
