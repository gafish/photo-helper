// 过滤目录和图片
export const filterDirAndImage = (files: any) =>
  files.filter((file: any) => file.is_dir || file.file_type === 'Image')

// 文件排序
export const sortFiles = (files: any) =>
  files.sort((a: any, b: any) =>
    a.is_dir && !b.is_dir ? -1 : b.is_dir && !a.is_dir ? 1 : 0,
  )
