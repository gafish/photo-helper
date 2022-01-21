import { invoke } from '@tauri-apps/api'

/**
 *
 * @param path 目录路径
 * @returns 是否是目录
 */
export const isDir = (path: string): Promise<boolean> => {
  return new Promise(resolve => {
    invoke('is_dir', { path }).then((result: any) => {
      resolve(result)
    })
  })
}

/**
 *
 * @param dir 目录路径
 * @returns 目录下的文件信息列表
 */
export const readDir = (dir: string): Promise<any> => {
  return new Promise(resolve => {
    invoke('read_directory', { dir }).then((result: any) => {
      // console.log('result: ', result);
      resolve(result.files)
    })
  })
}

/**
 *
 * @param dir 目录路径
 * @returns 目录下的文件列表
 */
export const getFilesInDirectory = (dir: string): Promise<any> => {
  return new Promise(resolve => {
    invoke('get_files_in_directory', { dir }).then((images: any) => {
      resolve(images)
    })
  })
}
