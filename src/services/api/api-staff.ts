import axios from './api'
import config from './config'

import type { AxiosPromise } from 'axios'
import type { IDataTableQuery, IStaffPage } from '@/services/definitions'


const version = config.site.current_version
const url = `v${ version }/mngmt/mcstaff`

export class ApiStaff {

    /**
     * Request datatable page data according to the given query parameters
     * @param queryParams Parameterized request for the entities. Contains query params such as pagination details and filter options for searching.
     */
    public static reqStaffPage( queryParams: IDataTableQuery ): AxiosPromise<IStaffPage> {

        const payload = {
            Orderer: queryParams.Orderer,
            OrderDir: queryParams.OrderDir,
            Limit: queryParams.Limit,
            Search: queryParams.Search,
            Offset: queryParams.Offset,
            ...queryParams.Filters
        }

        return axios.get(url + '/page', { params: payload })
    }

    /**
     * Invoke an api call to deletes a bunch of entities
     * @param ids List of entities identifiers
     */
    public static reqDelete( ids: Array<number> ): AxiosPromise<void> {
        return axios.delete(url, {
            data: ids
        })
    }

    /**
     * Invoke an api call to toggle the status of the entities with the given identifiers
     * @param ids entities identifiers
     */
    public static bulkToggle( ids: Array<number> ): AxiosPromise<void> {
        return axios.post(url + '/toggle', ids)
    }
}
