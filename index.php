<?php

// Autoload
require 'vendor/autoload.php';

// Prepare Packages
use Symfony\Component\Dotenv\Dotenv;

// Prepare App Classes
use PillarCore\App\App as PillarCore;
use PillarCore\TemplateEngines\Twig\TwigService;

// Register and load .env
$dotenv = new Dotenv();
$dotenv->load(__DIR__ . '/.env');

// Register App
PillarCore::register();

// Register Custom Twig Filters & Functions
include 'App/TwigFilters/ExampleFilter.php';
PillarCore::addTwigExtension(new ExampleFilter());

include 'App/TwigFunctions/ExampleFunction.php';
PillarCore::addTwigExtension(new ExampleFunction());

// Run
PillarCore::run();
