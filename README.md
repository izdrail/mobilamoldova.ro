
# Appplication Demo
Check the following demo project. It is just a straight installation of the project without any modification.

Demo URL: https://laravel.nasirkhn.com

You may use the following account credentials to access the application backend.

```
User: super@admin.com
Pass: secret

User: user@user.com
Pass: secret

```

## Demo Data
If you want to test the application on your local machine with additional demo data you may use the following command.

```php

php artisan laravel-starter:insert-demo-data

```

There are options to truncate the `posts, categories, tags, and comments` tables and insert new demo data.

`--fresh` option will truncate the tables, without this command a new set of data will be inserted.

```php

php artisan laravel-starter:insert-demo-data --fresh

```

# Custom Commands

We have created a number of custom commands for the project. The commands are listed below with a brief about their use of it.

## Create New module

To create a project use the following command, you have to replace the MODULE_NAME with the name of the module.

```php
php artisan module:build MODULE_NAME
```

You may want to use `--force` option to overwrite the existing module. if you use this option, it will replace all the existing files with the default stub files.

```php
php artisan module:build MODULE_NAME --force
```

## Clear All Cache

```bash
composer clear-all
```

this is a shortcut command to clear all cache including config, route, and more

## Code Style Fix

We are now using `Laravel Pint` to make the code style stay as clean and consistent as the Laravel Framework. Use the following command to apply CS-Fix.

```bash
composer pint
```

Along with Laravel Pint, we are using `prettier` to format the blade templates. You can install the `prettier` extension in your favorite editor.
The following command will format the blade templates.

```bash
npm run format
```

or if you are using `yarn` then you can use the following command.

```bash
yarn format
```

## Role - Permissions

Several custom commands are available to add and update `role-permissions`. Please read the [Role - Permission Wiki page](https://github.com/nasirkhan/laravel-starter/wiki/Role-Permission), where you will find the list of commands with examples.

