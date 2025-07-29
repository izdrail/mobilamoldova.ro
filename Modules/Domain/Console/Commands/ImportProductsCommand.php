<?php

namespace Modules\Domain\Console\Commands;

use Illuminate\Console\Command;
use Maatwebsite\Excel\Facades\Excel;
use Modules\Domain\Imports\ProductsImport;
use Modules\Domain\Imports\ProductsToPostsImporter;

class ImportProductsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:products';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import products from our local file';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        Excel::import(new ProductsToPostsImporter(), database_path('csv/feed.csv'));

    }
}
