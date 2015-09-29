/// <reference path='../../typings/tsd.d.ts' />

import {Movie} from '../models/movie';
import {BaseRepository, IBaseRepository} from '../repository/base';
import logger = require('winston');


export interface IEntityService<TEntity>
{
    initData(sampleData: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any);
    create(data: TEntity, callback: (errr: Error, item: TEntity) => any);
    bulk(data: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any);
    getAll(sortKey: string, sortOrder: string, callback: (errr: Error, item: Array<TEntity>) => any);
    getByQuery(query: Object, sortKey: string, sortOrder: string, callback: (errr: Error, item: Array<TEntity>) => any);
    getById(id: number, callback: (errr: Error, item: TEntity) => any);
    update(id: string);
    delete(id: string);
}

export class EntityService<TEntity> implements IEntityService<TEntity>
{
    repository: IBaseRepository<TEntity>;

    public constructor(repository: IBaseRepository<TEntity>)
    {
        this.repository = repository;
    }

    public initData(sampleData: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any)
    {
        this.bulk(sampleData, callback);
    }

    public create(data: TEntity, callback: (errr: Error, item: TEntity) => any)
    {
        this.repository.create(data, callback);
    }

    public bulk(data: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any)
    {
        this.repository.bulk(data, callback);
    }

    public getAll(sortKey: string, sortOrder: string, callback: (errr: Error, item: Array<TEntity>) => any)
    {
        this.repository.readMany({}, sortKey, sortOrder, callback);
    }

    public getByQuery(query: Object, sortKey: string, sortOrder: string, callback: (errr: Error, item: Array<TEntity>) => any)
    {
        this.repository.readMany(query, sortKey, sortOrder, callback);
    }

    public getById(id: number, callback: (errr: Error, item: TEntity) => any)
    {
        this.repository.get(id, callback);
    }

    public update(id: string)
    {
        return this.repository.update(id);
    }

    public delete(id: string)
    {
        return this.repository.delete(id);
    }
}


  