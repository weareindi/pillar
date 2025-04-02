<?php

/**
 * This is an example CLI Command
 * Ensure to add this command to your `projectroot/commands.php` file
 */

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class ExampleCommand extends Command {
    protected function configure() {
        $this->setName('example');
        $this->setDescription('This is an example custom console command');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {
        $output->writeln('Example Command Executed');

        // we're done now
        return Command::SUCCESS;
    }
}
