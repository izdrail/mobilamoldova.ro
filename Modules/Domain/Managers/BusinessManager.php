<?php

namespace Modules\Domain\Managers;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use Modules\Domain\Contracts\BusinessManagerContract;

class BusinessManager implements BusinessManagerContract
{

    public function importProducts(File $file): Collection
    {
        return collect();
    }
}
