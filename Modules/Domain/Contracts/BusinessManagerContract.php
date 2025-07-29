<?php

namespace Modules\Domain\Contracts;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;

interface BusinessManagerContract
{
    public function importProducts(File $file):Collection;
}
