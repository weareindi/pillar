<?php

// Autoload
require 'vendor/autoload.php';

// Prepare Packages
use Symfony\Component\Dotenv\Dotenv;

// Prepare App Classes
use Pillar\App\App as Pillar;

// Register and load .env
$dotenv = new Dotenv();
$dotenv->load(__DIR__ . '/.env');

// Register App
Pillar::register();

// Add global context data
include 'App/TwigGlobalContextData/TwigGlobalContextData.php';
Pillar::addTwigGlobalContextData(new TwigGlobalContextData());

// Register Custom Twig Filters & Functions
include 'App/TwigFilters/ExampleFilter.php';
Pillar::addTwigExtension(new ExampleFilter());

include 'App/TwigFunctions/ExampleFunction.php';
Pillar::addTwigExtension(new ExampleFunction());

// Run
Pillar::run();
