import { CommandFactory } from 'nest-commander';
import { CommandModule } from './command/command.module';

const bootstrap = async () => {
  await CommandFactory.run(CommandModule);
};

bootstrap();
