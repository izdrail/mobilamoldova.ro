<?php

namespace Modules\Domain\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\Domain\Contracts\BusinessManagerContract;
use Modules\Domain\Managers\BusinessManager;
use Symfony\Component\Finder\Finder;

class DomainServiceProvider extends ServiceProvider
{
    public function register():void
    {
        $this->app->bind(BusinessManagerContract::class, BusinessManager::class);
    }

    public function boot():void
    {
        $this->registerCommands('\Modules\Domain\Console\Commands');
    }

    protected function registerCommands($namespace = '')
    {
        $finder = new Finder; // from Symfony\Component\Finder;
        $finder->files()->name('*.php')->in(__DIR__.'/../Console');

        $classes = [];
        foreach ($finder as $file) {
            $class = $namespace.'\\'.$file->getBasename('.php');
            array_push($classes, $class);
        }

        $this->commands($classes);
    }
}
