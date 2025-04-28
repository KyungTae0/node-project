// src/common/utils/date.util.ts

/**
 * @alias KST 기준 포맷 날짜 변환
 * @description Date 객체를 KST 시간대 기준으로 포맷팅 (yyyy-MM-dd HH:mm:ss)
 */
export function formatDateToKST(date: Date): string {
  const koreaTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return koreaTime.toISOString().replace('T', ' ').substring(0, 19);
}
