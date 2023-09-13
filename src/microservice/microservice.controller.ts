import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MicroserviceService } from './microservice.service';
import { CreateMicroserviceDto } from './dto/create-microservice.dto';
import { UpdateMicroserviceDto } from './dto/update-microservice.dto';

@Controller('microservice')
export class MicroserviceController {
  constructor(private readonly microserviceService: MicroserviceService) {}

  @MessagePattern('createMicroservice')
  create(@Payload() createMicroserviceDto: CreateMicroserviceDto) {
    return this.microserviceService.create(createMicroserviceDto);
  }

  @MessagePattern('findAllMicroservice')
  findAll() {
    return this.microserviceService.findAll();
  }

  @MessagePattern('findOneMicroservice')
  findOne(@Payload() id: number) {
    return this.microserviceService.findOne(id);
  }

  @MessagePattern('updateMicroservice')
  update(@Payload() updateMicroserviceDto: UpdateMicroserviceDto) {
    return this.microserviceService.update(
      updateMicroserviceDto.id,
      updateMicroserviceDto,
    );
  }

  @MessagePattern('removeMicroservice')
  remove(@Payload() id: number) {
    return this.microserviceService.remove(id);
  }
}
